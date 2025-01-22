using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CloudinaryConfiguration = cabandos.Server.Features.Configurations.CloudinaryConfigutation;

namespace cabandos.Server.Features.Services;

public class CloudinaryUploader
{
    private static readonly Cloudinary _cloudinary;

    static CloudinaryUploader()
    {
        var account = new Account(CloudinaryConfiguration.Cloud, CloudinaryConfiguration.ApiKey, CloudinaryConfiguration.ApiSecret);
        _cloudinary = new Cloudinary(account);
    }

    public static async Task<ImageUploadResult> UploadAsync(IFormFile file)
    {
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream())
        };
        return await _cloudinary.UploadAsync(uploadParams);
    }
}