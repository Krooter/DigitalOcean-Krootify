using System;

namespace Common.Exceptions
{
    public class EntityAlreadyExistException : ApplicationException
    {
        private EntityAlreadyExistException(Type entityType, int firstId, int secondId) 
            : base($"Entity of type { entityType.Name } with unique {firstId} and {secondId} already exist!")
        {
        }

        public static EntityAlreadyExistException OfType<T>(int firstId, int secondId)
        {
            return new EntityAlreadyExistException(typeof(T), firstId, secondId);
        }
    }
}
