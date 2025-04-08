using Microsoft.AspNetCore.Http;
namespace PDF_CRUD.DTO
{
    public class UserUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IFormFile? ImageFile { get; set; }  // Nullable for optional updates
        public IFormFile? PdfFile { get; set; }    // Nullable for optional updates
        public string? ExistingImagePath { get; set; } // For displaying current image
        public string? ExistingPdfPath { get; set; }   // For displaying current PDF
    }
}
