using DTO;
using DataAccess.CRUD;
using System.Security.Cryptography;
using System.Text;

namespace BL
{
    public class UserManager
    {
        //Clase encargada de recibir el request del API y comunicarse con el DataAccs


        //Metodo para registrar usuario: recibe la informacion del Api y la pasa al backend 
        public void RegisterUser(User user)
        {
            //Se realiza proceso de encriptar la contrasena.
            var passwordHelper = new PasswordHelper();
            byte[] salt = passwordHelper.GenerateSalt();
            byte[] hashedPassword = passwordHelper.HashPassword(user.Password, salt);

            //Se agrega un role predefinido. Role 1 = Usuario general.  
            user.Role_id = 1;

            //Se envia el usuario, la contraseña encriptada al backend y se obtiene el userId.
            UserCrudFactory us_crud = new UserCrudFactory();
            string baseStringPassword = Convert.ToBase64String(hashedPassword);
            int userId = us_crud.RegisterUser(user, baseStringPassword);

            //Se envia la Salt junto el userId al backend.
            string baseStringSalt = Convert.ToBase64String(salt);
            us_crud.RegisterSalt(userId, baseStringSalt);
        }

        //Metodo para hacer login
        public User Login(string username, string password)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            User user = (User)us_crud.RetrieveUserByUsername(username);
            if(user == null)
            {
                return null;
            }
          
            string saltBase64 = us_crud.RetrieveSaltByUserId(user.Id);

            try
            {
                byte[] salt = Convert.FromBase64String(saltBase64);
                byte[] storedHash = Convert.FromBase64String(user.Password);

                var passwordHelper = new PasswordHelper();

                bool isValidPassword = passwordHelper.VerifyPassword(password,
                storedHash, salt);

                return isValidPassword ? user : null;
            }
            catch (FormatException)
            {
                throw new Exception("La sal recuperada no es una cadena Base64 válida.");
            }  
        }

        //Metodo para uactualizar la contraseña con el token y new password 
        public bool UpdatePassword(string token, string newPassword)
        {
            //Generamos la Salt y encriptamos la nueva contrasenña
            var passwordHelper = new PasswordHelper();
            byte[] salt = passwordHelper.GenerateSalt();
            byte[] hashedPassword = passwordHelper.HashPassword(newPassword, salt);

            //Convertirmos la salt y la nuewva contrasena a string 
            string baseStringPassword = Convert.ToBase64String(hashedPassword);
            string baseStringSalt = Convert.ToBase64String(salt);

            //Enviamos el token, la contrasenña y la salt al crud 
            UserCrudFactory us_crud = new UserCrudFactory();
            return us_crud.UpdatePasswordByToken(token, baseStringPassword, baseStringSalt);
        }

        //Metodo para obtener el Usuario por el Email 
        public User GetUserByEmail(string email)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return (User)us_crud.RetrieveByEmail(email);
        }

        //Metodo para guardar el token de restablecimento en la tabla usuario
        public bool AddResetToken(int userId, string token)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return us_crud.AddResetToken(userId, token);
        }

        //Metodo para obtener el Usuario por el Username 
        public User GetUserByUsername(string username)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return (User)us_crud.RetrieveByEmail(username);
        }

        //Metodo para obtener el Usuario por el Id  
        public User GetUserById(int id)
        {
            UserCrudFactory us_crud = new UserCrudFactory();
            return (User)us_crud.RetrieveById(id);
        }
    }
}



