using System;

namespace Common.Exceptions
{
    public class FileIsNullException : ApplicationException
    {
        private FileIsNullException(Type entityType) : base($"File of type {entityType.Name} not found or is empty.")
        {

        }

        public static FileIsNullException OfType<T>()
        {
            return new FileIsNullException(typeof(T));
        }
    }
}
