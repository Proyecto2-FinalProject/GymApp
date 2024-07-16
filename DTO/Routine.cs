namespace DTO
{
    public class Routine : BaseClass
    {
        public string InstructorName { get; set; }
        public string ExerciseName { get; set; }
        public string ExerciseType { get; set; }
        public int Sets { get; set; }
        public decimal Weight { get; set; }
        public TimeSpan TimeDuration { get; set; }
        public string Machine { get; set; }
    }
}