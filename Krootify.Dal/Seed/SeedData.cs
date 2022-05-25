using Domain;
using Domain.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Dal.Seed
{
    public class SeedData
    {
        public static async Task SeedDataToDb(KrootifyDbContext context, ILoggerFactory logger, UserManager<User> userManager)
        {
            List<string> guids = new List<string>();
            try
            {
                if (!userManager.Users.Any())
                {
                    var userData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/User.json");

                    var user = JsonSerializer.Deserialize<List<User>>(userData);

                    foreach (var item in user)
                    {
                        guids.Add(item.Id);
                        await userManager.CreateAsync(item, "Pa$$word123");
                    }
                }

                if (!context.PlayLists.Any())
                {
                    var playListsData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/PlayLists.json");

                    var playLists = JsonSerializer.Deserialize<List<PlayList>>(playListsData);

                    var iter = 1;

                    foreach (var item in playLists)
                    {
                        item.UserId = guids[iter];
                        iter++;
                        context.PlayLists.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Artists.Any())
                {
                    var artistData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/Artist.json");

                    var artists = JsonSerializer.Deserialize<List<Artist>>(artistData);

                    foreach (var item in artists)
                    {
                        context.Artists.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                if (!context.Albums.Any())
                {
                    var albumData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/Album.json");

                    var albums = JsonSerializer.Deserialize<List<Album>>(albumData);

                    foreach (var item in albums)
                    {
                        context.Albums.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.SongGenres.Any())
                {
                    var genreData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/Genre.json");

                    var genres = JsonSerializer.Deserialize<List<SongGenre>>(genreData);

                    foreach (var item in genres)
                    {
                        context.SongGenres.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.SongCategories.Any())
                {
                    var categoryData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/Category.json");

                    var categories = JsonSerializer.Deserialize<List<SongCategory>>(categoryData);

                    foreach (var item in categories)
                    {
                        context.SongCategories.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Songs.Any())
                {
                    var songsData = await File.ReadAllTextAsync("../Krootify.Dal/Seed/DataForSeed/Song.json");

                    var songs = JsonSerializer.Deserialize<List<Song>>(songsData);

                    var incr = 0;

                    foreach (var item in songs)
                    {
                        incr++;
                        item.Duration = new TimeSpan(00, 01, 30);
                        item.SongUrl = item.SongUrl + incr;
                        context.Songs.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            } 
            catch(Exception ex)
            {
                var createdLogger = logger.CreateLogger<KrootifyDbContext>();
                createdLogger.LogError(ex.Message);
            }
            
        }
    }
}
