using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Response<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Response<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Response<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Response<List<Activity>>.Success(await _context.Activities.ToListAsync(cancellationToken));
            }
        }
    }
}