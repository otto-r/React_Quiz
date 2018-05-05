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
        [Route("SubmitScore")]
        public int SubmitScore(int points, string id)
        {
            var user = _context.Users.Where(u => u.Id == id).Single();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{id}'.");
            }
            Score score = new Score
            {
                Points = points,
                DateTime = DateTime.Now,
                User = user
            };
            _context.Scores.Add(score);
            var result = _context.SaveChanges();

            return result;
        }

        // GET: api/Questions
        [HttpGet]
        public IEnumerable<Question> GetQuestions()
        {
            return _context.Questions;
        }

        [HttpGet]
        [Route("HighScore")]
        public IEnumerable<FormattedScore> GetHighScore()
        {

            List<FormattedScore> scores = new List<FormattedScore>();
            foreach (var score in _context.Scores)
            {
                scores.Add(new FormattedScore
                {
                    Id = score.Id,
                    Points = score.Points,
                    UserName = _context.Users.Where(u => u.Id == score.UserId).Single().UserName,
                    Date = score.DateTime.ToString()
                }
                );
            }
            return scores.OrderByDescending(s => s.Points).ThenByDescending(s => s.Date);
        }

        public class FormattedScore
        {
            public int Id { get; set; }
            public int Points { get; set; }
            public string UserName { get; set; }
            public string Date { get; set; }
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