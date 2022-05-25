using Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (EntityNotFoundException ex)
            {
                await HandleExceptionAsync(context, ex, HttpStatusCode.NotFound,
                    "Resource not found, verify and try again!");
            }
            catch (FileIsNullException ex)
            {
                await HandleExceptionAsync(context, ex, HttpStatusCode.BadRequest);
            }
            catch (EntityAlreadyExistException ex)
            {
                await HandleExceptionAsync(context, ex, HttpStatusCode.BadRequest);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                await HandleExceptionAsync(context, ex, HttpStatusCode.InternalServerError,
                    "Data may have been modified or deleted. Please reload the page.");
            }
            catch (UnauthorizedAccessException ex)
            {
                await HandleExceptionAsync(context, ex, HttpStatusCode.Unauthorized);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, HttpStatusCode.InternalServerError);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception, HttpStatusCode statusCode, string customMessage = null)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)statusCode;
            _logger.LogInformation($"Request failed with status code {statusCode}" + $"/n {context.Response}");
            await response.WriteAsync(JsonConvert.SerializeObject(new
            {
                message = customMessage ?? exception.Message,
                statusCode = statusCode
            }));
        }
    }
}
