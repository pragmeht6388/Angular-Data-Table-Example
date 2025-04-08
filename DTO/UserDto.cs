using System.ComponentModel.DataAnnotations;

namespace PDF_CRUD.DTO
{
    public class UserDto
    {
        public string Name { get; set; }

        public IFormFile ImageFile { get; set; }
        public IFormFile PdfFile { get; set; }
    }
}
