using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quiz_react.Data;
using Quiz_react.Models;
using System;
using System.Linq;

namespace Quiz.Models
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();


            //if (context.Roles.Any())
            //{
            //    return;   // DB has been seeded
            //}

            //Wipes the db clean
            context.Questions.RemoveRange(context.Questions);
            context.Scores.RemoveRange(context.Scores);

            context.Roles.RemoveRange(context.Roles);
            context.RoleClaims.RemoveRange(context.RoleClaims);
            context.UserClaims.RemoveRange(context.UserClaims);
            context.UserLogins.RemoveRange(context.UserLogins);
            context.UserRoles.RemoveRange(context.UserRoles);
            context.Users.RemoveRange(context.Users);


            context.Roles.AddRange(
                new IdentityRole
                {
                    Name = "Admin"
                },
                new IdentityRole
                {
                    Name = "Member"
                });

            //TODO: Something doesn't work when seeding questions

            context.Questions.AddRange(
                new Question
                {
                    Text = "Have you ever been so far as to decided to go do look more like?",
                    AnswerA = "Yes",
                    AnswerB = "No",
                    AnswerC = "Maybe",
                    AnswerD = "What?",
                    CorrectAnswer = "D"
                },
                new Question
                {
                    Text = "What is the airspeed velocity of an unladen swallow?",
                    AnswerA = "20 km/h",
                    AnswerB = "30 km/h",
                    AnswerC = "40 km/h",
                    AnswerD = "What do you mean, an african or a european swallow?",
                    CorrectAnswer = "D"
                },
            new Question
            {
                Text = "Question 3",
                AnswerA = "Answer A",
                AnswerB = "Answer B",
                AnswerC = "Answer E",
                AnswerD = "Answer D",
                CorrectAnswer = "C"
            },
            new Question
            {
                Text = "If animals could talk, which would be the rudest?",
                AnswerA = "Giraffe",
                AnswerB = "Pigeon",
                AnswerC = "Moose",
                AnswerD = "Fish",
                CorrectAnswer = "A"
            },
            new Question
            {
                Text = "How many chickens would it take to kill an elephant",
                AnswerA = "10",
                AnswerB = "100",
                AnswerC = "50 000",
                AnswerD = "1",
                CorrectAnswer = "B"
            },
            new Question
            {
                Text = "What is the capital of Assyria?",
                AnswerA = "Tyre",
                AnswerB = "Aššur",
                AnswerC = "Thebes",
                AnswerD = "I don't know that.",
                CorrectAnswer = "B"
            }
        );

            context.SaveChanges();
        }
    }
}