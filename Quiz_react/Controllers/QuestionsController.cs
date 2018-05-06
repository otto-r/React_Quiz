using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz_react.Data;
using Quiz_react.Models;

namespace Quiz_react.Controllers
{
    [Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Submit")]
        public int SubmitAnswer(string answer)
        {
            return 1;
        }

        [HttpGet]
        [Route("NewQuestion")]
        public string NewQuestion(string text, string answerA, string answerB, string answerC, string answerD, string correctAnswer)
        {
            List<string> paramList = new List<string>
            {
                text,
                answerA,
                answerB,
                answerC,
                answerD,
                correctAnswer
            };

            if (paramList.Any(s => s == null)) { return "Something set to null"; }
            else
            {
                Question question = new Question
                {
                    Text = text,
                    AnswerA = answerA,
                    AnswerB = answerB,
                    AnswerC = answerC,
                    AnswerD = answerD,
                    CorrectAnswer = correctAnswer
                };

                _context.Questions.Add(question);
                _context.SaveChanges();

                return "Question probably added :)";

            }
        }

        [HttpGet]
        [Route("EditQuestion")]
        public async Task<string> EditQuestion(int id, string text, string answerA, string answerB, string answerC, string answerD, string correctAnswer)
        {
            var question = await _context.Questions.Where(q => q.Id == id).FirstOrDefaultAsync();

            question.Text = text;
            question.AnswerA = answerA;
            question.AnswerB = answerB;
            question.AnswerC = answerC;
            question.AnswerD = answerD;
            question.CorrectAnswer = correctAnswer;

            _context.Update(question);
            _context.SaveChanges();
            return "Saved changes to question: " + question.Text + " with id: " + question.Id;
        }

        // GET: api/Questions
        [HttpGet]
        public IEnumerable<Question> GetQuestions()
        {
            return _context.Questions;
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Questions
        [HttpPost]
        public async Task<IActionResult> PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.SingleOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}