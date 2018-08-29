using Microsoft.EntityFrameworkCore;

namespace reactToDo.Service
{
    public class Service
    {
        private readonly DbContext _context;

        public Service(DbContext context)
        {
            _context = context;
        }

        public void Test()
        {
            //using (var context = new dbContext())
            //{
            /*try
            {
                table1 tb1 = new table1();
                tb1.Name = "yyy";
                _context.table1.Add(tb1);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                object o = ex;
            }*/
            //}
        }
    }
}
 
 