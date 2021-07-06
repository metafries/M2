using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();

        protected ActionResult HandleResult<T>(Response<T> rsp)
        {
            if (rsp == null) return NotFound();
            if (rsp.IsSuccess && rsp.Value == null) return NotFound();
            if (rsp.IsSuccess && rsp.Value != null) return Ok(rsp.Value);

            return BadRequest(rsp.Error);
        }
    }
}