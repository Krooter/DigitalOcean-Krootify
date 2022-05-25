using Dal.Interfaces;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Dal.Extensions
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {

        }

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<T, bool>> Criteria { get; }

        public List<Func<IQueryable<T>, IIncludableQueryable<T, object>>> Includes { get; } 
            = new List<Func<IQueryable<T>, IIncludableQueryable<T, object>>>();

        public Expression<Func<T, object>> OrderBy { get; private set; }

        public Expression<Func<T, object>> OrderByDescending { get; private set; }

        public int Take { get; private set; }

        public int Skip { get; private set; }

        public bool IsPaggingEnabled { get; private set; }

        protected void AddInclude(Func<IQueryable<T>, IIncludableQueryable<T, object>> expression) => Includes.Add(expression);

        protected void AddOrderBy(Expression<Func<T, object>> expression) => OrderBy = expression;

        protected void AddOrderByDescending(Expression<Func<T, object>> expression) => OrderByDescending = expression;

        protected void ApplyPagging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPaggingEnabled = true;
        }
    }
}
