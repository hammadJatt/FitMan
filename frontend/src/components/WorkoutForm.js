import { useState } from "react";
import { addWorkout } from "../api/workoutApi";
import { useUser } from "@clerk/clerk-react";

const WorkoutForm = ({ refresh }) => {
  const { user } = useUser();
  const [form, setForm] = useState({
    name: "",
    category: "",
    duration: "",
  });
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user?.id) return;

  await addWorkout({
    ...form,
    user: user.id,
  });

  refresh();
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Workout Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />

      <input
        placeholder="Duration (min)"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
        required
      />

      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
