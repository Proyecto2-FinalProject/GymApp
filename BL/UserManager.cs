﻿using DTO;
using DataAccess.CRUD;
using System.Security.Cryptography;
using System.Text;

namespace BL
{
    public class UserManager
    {
        public void RegisterUser(User user)
        {
            var passwordHelper = new PasswordHelper();
            byte[] salt = passwordHelper.GenerateSalt();
            byte[] hashedPassword = passwordHelper.HashPassword(user.Password, salt);

            user.Role_id = 1;

            UserCrudFactory us_crud = new UserCrudFactory();
            string baseStringPassword = Convert.ToBase64String(hashedPassword);
            int userId = us_crud.RegisterUser(user, baseStringPassword);

            string baseStringSalt = Convert.ToBase64String(salt);
            us_crud.RegisterSalt(userId, baseStringSalt);
        }

        public string GetUserRoleName(int id)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            var RoleName = us_crud.GetUserRoleName(id);
            return RoleName;
        }

        public User Login(string username, string password)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            User user = (User)us_crud.RetrieveUserByUsername(username);
            if (user == null)
            {
                return null;
            }

            string saltBase64 = us_crud.RetrieveSaltByUserId(user.Id);

            try
            {
                byte[] salt = Convert.FromBase64String(saltBase64);
                byte[] storedHash = Convert.FromBase64String(user.Password);

                var passwordHelper = new PasswordHelper();

                bool isValidPassword = passwordHelper.VerifyPassword(password, storedHash, salt);

                return isValidPassword ? user : null;
            }
            catch (FormatException)
            {
                throw new Exception("La sal recuperada no es una cadena Base64 válida.");
            }
        }

        public bool UpdatePassword(string token, string newPassword)
        {
            var passwordHelper = new PasswordHelper();
            byte[] salt = passwordHelper.GenerateSalt();
            byte[] hashedPassword = passwordHelper.HashPassword(newPassword, salt);

            string baseStringPassword = Convert.ToBase64String(hashedPassword);
            string baseStringSalt = Convert.ToBase64String(salt);

            UserCrudFactory us_crud = new UserCrudFactory();
            return us_crud.UpdatePasswordByToken(token, baseStringPassword, baseStringSalt);
        }

        public User GetUserByEmail(string email)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return (User)us_crud.RetrieveByEmail(email);
        }

        public bool AddResetToken(int userId, string token)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return us_crud.AddResetToken(userId, token);
        }

        public User GetUserByUsername(string username)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return (User)us_crud.RetrieveByEmail(username);
        }

        public User GetUserById(int id)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return (User)us_crud.RetrieveById(id);
        }
    }
}