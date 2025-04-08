using System;
using System.Threading.Tasks;
using PDF_CRUD.DTO;
using PDF_CRUD.Model;
using PDF_CRUD.Repository;
namespace PDF_CRUD.Service
{
    public class UserService
    {
        private readonly UserRepository _userRepository;
        private readonly FileService _fileService;

        public UserService(UserRepository userRepository, FileService fileService)
        {
            _userRepository = userRepository;
            _fileService = fileService;
        }

        public async Task<UserResponseDto> CreateUserAsync(UserCreateDto userDto)
        {
            var user = new User
            {
                Name = userDto.Name,
                ImagePath = await _fileService.SaveFileAsync(userDto.ImageFile, "images"),
                PdfPath = await _fileService.SaveFileAsync(userDto.PdfFile, "pdfs")
            };

            var createdUser = await _userRepository.CreateAsync(user);
            return MapToDto(createdUser);
        }

        public async Task<UserResponseDto> UpdateUserAsync(int id, UserUpdateDto userDto)
        {
            var existingUser = await _userRepository.GetByIdAsync(id);
            if (existingUser == null)
                return null;

            existingUser.Name = userDto.Name;

            if (userDto.ImageFile != null)
            {
                _fileService.DeleteFile(existingUser.ImagePath);
                existingUser.ImagePath = await _fileService.SaveFileAsync(userDto.ImageFile, "images");
            }

            if (userDto.PdfFile != null)
            {
                _fileService.DeleteFile(existingUser.PdfPath);
                existingUser.PdfPath = await _fileService.SaveFileAsync(userDto.PdfFile, "pdfs");
            }

            var updatedUser = await _userRepository.UpdateAsync(existingUser);
            return MapToDto(updatedUser);
        }

        private UserResponseDto MapToDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                ImageUrl = $"/{user.ImagePath}",
                PdfUrl = $"/{user.PdfPath}"
            };
        }
    }
}
