using Microsoft.AspNetCore.Identity;

namespace reactToDo
{
    public static class IdentityDataInitializer
    {
        public static void SeedData(
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        public static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "User";

                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }

        public static void SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (userManager.FindByNameAsync("matts@stormfrog.com").Result == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "matts@stormfrog.com";

                IdentityResult result = userManager.CreateAsync(user, "4i9S97Dx2@LQM9KCwTabrm").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }
        }
    }
}
