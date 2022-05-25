using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        void Add(T entity);
        void Update(T entity);
        Task<T> Delete(int id);
        Task<T> GetById(int id);
        Task<T> GetByUserId(string id);
        Task<IReadOnlyList<T>> ListAll();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAllWithSpec(ISpecification<T> spec);
        Task<int> CountAsync();
        Task SaveChangesAsync();
    }
}
