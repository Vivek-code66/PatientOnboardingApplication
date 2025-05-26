using System;
using System.Collections.Generic;
using System.Linq;

namespace NotificationService
{
    public class User
    {
        public int UserId { get; set; }
        public NotificationPreferences Preferences { get; set; }
    }

    public class NotificationPreferences
    {
        public bool ReceiveMessageAlerts { get; set; }
        public bool ReceiveUpdateAlerts { get; set; }
        public List<string> PreferredChannels { get; set; }
    }

    public class Notification
    {
        public string Message { get; set; }
        public string Type { get; set; } // e.g., "Message", "Update"
    }

    public class NotificationService
    {
        private readonly List<User> _users;

        public NotificationService(List<User> users)
        {
            _users = users;
        }

        public void SendNotification(int userId, Notification notification)
        {
            var user = _users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
            {
                Console.WriteLine("User not found.");
                return;
            }

            if (ShouldSendNotification(user.Preferences, notification))
            {
                foreach (var channel in user.Preferences.PreferredChannels)
                {
                    Console.WriteLine($"Sending '{notification.Message}' via {channel} to user {userId}");
                }
            }
            else
            {
                Console.WriteLine($"Notification '{notification.Message}' not sent to user {userId} due to preferences.");
            }
        }

        private bool ShouldSendNotification(NotificationPreferences preferences, Notification notification)
        {
            switch (notification.Type)
            {
                case "Message":
                    return preferences.ReceiveMessageAlerts;
                case "Update":
                    return preferences.ReceiveUpdateAlerts;
                default:
                    return false;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var users = new List<User>
            {
                new User
                {
                    UserId = 1,
                    Preferences = new NotificationPreferences
                    {
                        ReceiveMessageAlerts = true,
                        ReceiveUpdateAlerts = false,
                        PreferredChannels = new List<string> { "Email", "SMS" }
                    }
                },
                new User
                {
                    UserId = 2,
                    Preferences = new NotificationPreferences
                    {
                        ReceiveMessageAlerts = false,
                        ReceiveUpdateAlerts = true,
                        PreferredChannels = new List<string> { "Push" }
                    }
                }
            };

            var notificationService = new NotificationService(users);

            var messageNotification = new Notification { Message = "You have a new message!", Type = "Message" };
            var updateNotification = new Notification { Message = "System update available.", Type = "Update" };

            notificationService.SendNotification(1, messageNotification);
            notificationService.SendNotification(1, updateNotification);
            notificationService.SendNotification(2, messageNotification);
            notificationService.SendNotification(2, updateNotification);
        }
    }
}