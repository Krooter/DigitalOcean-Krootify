﻿using System;

namespace Common.Exceptions
{
    public class EntityNotFoundException : ApplicationException
    {
        private EntityNotFoundException(Type entityType, long id) : base($"Entity of type { entityType.Name } with id: { id } not found")
        {
        }

        private EntityNotFoundException(Type entityType) : base($"Entity of type { entityType.Name } not found")
        {
        }

        public static EntityNotFoundException OfType<T>(long id)
        {
            return new EntityNotFoundException(typeof(T), id);
        }

        public static EntityNotFoundException OfType<T>()
        {
            return new EntityNotFoundException(typeof(T));
        }
    }
}
