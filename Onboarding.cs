using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnboardingSystem
{
    public class User
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }

    public interface IFormFillerService
    {
        Task<Dictionary<string, string>> GetPreFilledDataAsync(User user);
    }

    public class FormFillerService : IFormFillerService
    {
        public async Task<Dictionary<string, string>> GetPreFilledDataAsync(User user)
        {
            // Simulate fetching data from a database or external service
            await Task.Delay(100); // Simulate async operation
            return new Dictionary<string, string>
            {
                { "Name", user.Name },
                { "Email", user.Email },
                { "PhoneNumber", user.PhoneNumber },
                { "Address", user.Address }
            };
        }
    }

    public interface INavigationService
    {
        Task<string> GetNextStepAsync(string currentStep);
    }

    public class NavigationService : INavigationService
    {
        private readonly Dictionary<string, string> _navigationSteps = new Dictionary<string, string>
        {
            { "Start", "PersonalInfo" },
            { "PersonalInfo", "ContactDetails" },
            { "ContactDetails", "Review" },
            { "Review", "Complete" }
        };

        public async Task<string> GetNextStepAsync(string currentStep)
        {
            await Task.Delay(50); // Simulate async operation
            return _navigationSteps.ContainsKey(currentStep) ? _navigationSteps[currentStep] : "Complete";
        }
    }

    public class OnboardingProcess
    {
        private readonly IFormFillerService _formFillerService;
        private readonly INavigationService _navigationService;

        public OnboardingProcess(IFormFillerService formFillerService, INavigationService navigationService)
        {
            _formFillerService = formFillerService;
            _navigationService = navigationService;
        }

        public async Task StartOnboardingAsync(User user)
        {
            string currentStep = "Start";
            while (currentStep != "Complete")
            {
                var preFilledData = await _formFillerService.GetPreFilledDataAsync(user);
                Console.WriteLine($"Current Step: {currentStep}");
                Console.WriteLine("Pre-filled Data:");
                foreach (var data in preFilledData)
                {
                    Console.WriteLine($"{data.Key}: {data.Value}");
                }

                currentStep = await _navigationService.GetNextStepAsync(currentStep);
                Console.WriteLine($"Navigating to: {currentStep}");
            }

            Console.WriteLine("Onboarding Complete!");
        }
    }

    class Program
    {
        static async Task Main(string[] args)
        {
            var user = new User
            {
                Name = "John Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "123-456-7890",
                Address = "123 Main St"
            };

            var formFillerService = new FormFillerService();
            var navigationService = new NavigationService();
            var onboardingProcess = new OnboardingProcess(formFillerService, navigationService);

            await onboardingProcess.StartOnboardingAsync(user);
        }
    }
}
