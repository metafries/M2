using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionBuilder
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<Exception> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionBuilder(RequestDelegate next, ILogger<Exception> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext ctx)
        {
            try
            {
                await _next(ctx);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                ctx.Response.ContentType = "application/json";
                ctx.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var rsp = _env.IsDevelopment()
                    ? new CustomException(ctx.Response.StatusCode, e.Message, e.StackTrace?.ToString())
                    : new CustomException(ctx.Response.StatusCode, "Server Error");

                var opt = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                await ctx.Response.WriteAsync(JsonSerializer.Serialize(rsp, opt));
            }
        }
    }
}