namespace DTO
{
    public class Routine : BaseClass
    {
        public string exercise_name { get; set; }
        public string exercise_type { get; set; }
        public int sets { get; set; }
        public decimal weight { get; set; }
        public TimeSpan time_duration { get; set; }
        public string machine { get; set; }
    }
}



