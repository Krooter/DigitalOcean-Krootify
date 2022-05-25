
using AutoMapper;
using BLL.Interfaces;
using Common.DTOs.Song;
using Common.DTOs.Subscription;
using Common.DTOs.User;
using Dal.Constants;
using Dal.Extensions.Specifications;
using Dal.Interfaces;
using Domain;
using Domain.Auth;
using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IRepository<Domain.Auth.Profile> _profileRepo;
        private readonly IUploadService _uploadService;
        private readonly IRepository<Subscription> _subscriptionRepo;
        private readonly IMapper _mapper;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, 
            IRepository<Domain.Auth.Profile> profileRepo, IUploadService uploadService, IRepository<Subscription> subscriptionRepo, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _profileRepo = profileRepo;
            _uploadService = uploadService;
            _subscriptionRepo = subscriptionRepo;
            _mapper = mapper;
        }

        public async Task<bool> CheckEmailExists(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        public async Task<UserForLoginDTO> GetCurrentUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var role = _userManager.GetClaimsAsync(user).Result[0].Value;
            var spec = new ProfileSpecification(user.Id);
            var profile = await _profileRepo.GetEntityWithSpec(spec);
            var subSpec = new SubscriptionSpecification(user.Id, user.Id);
            var sub = await _subscriptionRepo.GetEntityWithSpec(subSpec);

            var subscription = _mapper.Map<SubscriptionDTO>(sub);

            return new UserForLoginDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, role),
                Username = user.UserName,
                PhotoUrl = profile.PhotoUrl,
                Subscription = subscription
            };
        }

        public async Task<UserForLoginDTO> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Wrong email, please try again.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            var role = _userManager.GetClaimsAsync(user).Result[0].Value;

            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("Password don't match, please try again.");
            }

            var spec = new ProfileSpecification(user.Id);
            var profile = await _profileRepo.GetEntityWithSpec(spec);

            var subSpec = new SubscriptionSpecification(user.Id, user.Id);
            var sub = await _subscriptionRepo.GetEntityWithSpec(subSpec);

            var subscription = _mapper.Map<SubscriptionDTO>(sub);

            return new UserForLoginDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, role),
                Username = user.UserName,
                PhotoUrl = profile.PhotoUrl,
                Subscription = subscription
            };
        }

        public async Task<UserForLoginDTO> Register(RegisterDTO registerDTO)
        {
            if (await CheckEmailExists(registerDTO.Email))
            {
                throw new UnauthorizedAccessException("Email address in use!");
            }

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = registerDTO.Username,
                Email = registerDTO.Email,
                PasswordHash = registerDTO.Password,
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
                var profile = new Domain.Auth.Profile
                {
                    UserId = user.Id,
                    PhotoUrl = ApplicationConstants.UrlDefaultUserPhoto
                };

                _profileRepo.Add(profile);
                _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "Registered User")).GetAwaiter().GetResult();
            }

            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("Error on registration process.");
            }

            return new UserForLoginDTO
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, "Registered User"),
                Username = user.UserName,
                PhotoUrl = ApplicationConstants.UrlDefaultUserPhoto
            };
        }

        public async Task<UserForLoginDTO> UpdateEmail(string email, string token, string currentEmail)
        {
            var currentUser = await GetUser(currentEmail);

            if (await CheckEmailExists(email))
            {
                throw new UnauthorizedAccessException("Email address in use!");
            }

            var result = await _userManager.ChangeEmailAsync(currentUser, email, token);

            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("Error on changing email.");
            }

            return new UserForLoginDTO
            {
                Email = currentUser.Email,
                Username = currentUser.UserName,
                Token = _tokenService.CreateToken(currentUser, "Registered User")
            };
        }

        public async Task<UserForLoginDTO> UpdatePassword(string oldPassword, string newPassword, string email)
        {
            var user = await GetUser(email);

            if (!await CheckEmailExists(user.Email))
            {
                throw new UnauthorizedAccessException("Your are not authorized!");
            }

            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (!result.Succeeded)
            {
                throw new UnauthorizedAccessException("Error on changing password.");
            }

            return new UserForLoginDTO
            {
                Email = user.Email,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user, "Registered User")
            };
        }

        public async Task UpdatePhoto(PhotoToUpdateDTO photoToUpdate, string email)
        {
            var user = await GetUser(email);

            if (!await CheckEmailExists(user.Email))
            {
                throw new UnauthorizedAccessException("Your are not authorized!");
            }

            var spec = new ProfileSpecification(user.Id);

            var profile = await _profileRepo.GetEntityWithSpec(spec);

            await _uploadService.DeletePhotoAsync(profile.PhotoUrl.Replace(ApplicationConstants.UrlPhotoBlob, ""));
            var newPhotoUrl = await _uploadService.UploadAsync(photoToUpdate.Photo.OpenReadStream(), Guid.NewGuid().ToString(), photoToUpdate.Photo.ContentType);

            profile.PhotoUrl = newPhotoUrl;

            _profileRepo.Update(profile);

            await _profileRepo.SaveChangesAsync();
        }

        private async Task<User> GetUser(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }
    }
}
