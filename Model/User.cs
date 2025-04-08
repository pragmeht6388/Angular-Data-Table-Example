using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PDF_CRUD.Model
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public string PdfPath { get; set; }
    }
}
