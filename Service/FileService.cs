using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;
namespace PDF_CRUD.Service
{
    public class FileService
    {
        private readonly string _webRootPath;

        public FileService(IWebHostEnvironment env)
        {
            _webRootPath = env.WebRootPath;
        }

        public async Task<string> SaveFileAsync(IFormFile file, string subFolder)
        {
            if (file == null || file.Length == 0)
                return null;

            var uploadsFolder = Path.Combine(_webRootPath, "uploads", subFolder);
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Path.Combine("uploads", subFolder, uniqueFileName);
        }

        public void DeleteFile(string filePath)
        {
            if (!string.IsNullOrEmpty(filePath))
            {
                var fullPath = Path.Combine(_webRootPath, filePath);
                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                }
            }
        }
    }

}

