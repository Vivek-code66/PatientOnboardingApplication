using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChildInfoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChildInfoController : ControllerBase
    {
        private readonly IChildInfoService _childInfoService;

        public ChildInfoController(IChildInfoService childInfoService)
        {
            _childInfoService = childInfoService;
        }

        [HttpPost("autofill")]
        public IActionResult AutoFillChildInfo([FromBody] ChildInfoRequest request)
        {
            try
            {
                var autoFilledData = _childInfoService.AutoFillChildInfo(request);
                return Ok(autoFilledData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("upload")]
        public IActionResult UploadDocument(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded.");

                var filePath = Path.Combine("Uploads", file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                _childInfoService.ProcessUploadedDocument(filePath);

                return Ok("File uploaded successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    public interface IChildInfoService
    {
        ChildInfoResponse AutoFillChildInfo(ChildInfoRequest request);
        void ProcessUploadedDocument(string filePath);
    }

    public class ChildInfoService : IChildInfoService
    {
        public ChildInfoResponse AutoFillChildInfo(ChildInfoRequest request)
        {
            // Simulate auto-fill logic
            return new ChildInfoResponse
            {
                FirstName = request.FirstName ?? "John",
                LastName = request.LastName ?? "Doe",
                DateOfBirth = request.DateOfBirth ?? DateTime.Now.AddYears(-5)
            };
        }

        public void ProcessUploadedDocument(string filePath)
        {
            // Simulate document processing logic
            Console.WriteLine($"Processing document at {filePath}");
        }
    }

    public class ChildInfoRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }

    public class ChildInfoResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}