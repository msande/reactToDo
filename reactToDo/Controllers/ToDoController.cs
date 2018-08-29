using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using reactToDo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace reactToDo.Controllers
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ToDoController> _logger;

        /// <summary>
        /// ToDo Controller
        /// </summary>
        /// <param name="context"></param>
        /// <param name="logger"></param>
        public ToDoController(ApplicationDbContext context, ILogger<ToDoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all ToDo items
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public List<ToDoItem> GetItems()
        {
            _logger.LogInformation("Get all todo items");

            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            List<ToDoItem> items = _context.ToDoItems
                .Where(x => !x.IsDeleted && x.UserId == userId)
                .OrderBy(x => x.SortOrder)
                .ToList();

            return items;
        }

        /// <summary>
        /// Save ToDo items
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public IActionResult Save([FromBody] ToDoItem item)
        {
            _logger.LogInformation("Save item: {ItemName}({ItemId})", item.Name, item.Id);

            return UpsertItem(item);
        }

        /// <summary>
        /// Delete an item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public IActionResult Delete([FromBody] ToDoItem item)
        {
            _logger.LogInformation("Delete item: {ItemName}({ItemId})", item.Name, item.Id);

            item.SortOrder = -1;
            return UpsertItem(item);
        }

        /// <summary>
        /// Update/Insert an item
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        private IActionResult UpsertItem(ToDoItem item)
        {
            _logger.LogInformation("Upsert item: {ItemName}({ItemId})", item.Name, item.Id);

            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            item.UserId = userId;

            if (_context.ToDoItems.Any(x => x.Id == item.Id))
            {
                _context.Update(item);
            }
            else
            {
                var lastItem = _context.ToDoItems.Where(x => !x.IsDeleted && x.UserId == userId).OrderBy(x => x.SortOrder).LastOrDefault();
                if (lastItem == null)
                {
                    item.SortOrder = 1;
                }
                else
                {
                    item.SortOrder = lastItem.SortOrder + 1;
                }
                _context.Add(item);
            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError("{ItemName} : {Message}", item.Name, ex.Message);
                _logger.LogError(ex.InnerException.ToString());
                _logger.LogError(ex.StackTrace);
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return Ok();
        }
    }
}
