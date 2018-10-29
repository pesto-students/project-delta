import { ExerciseMaster } from '../index';

const getAllExerciseMaster = async () => {
  const projection = {
    name: 1,
    topicId: 1,
  };
  const exerciseList = await ExerciseMaster.find({}, projection);
  return exerciseList;
};

const insertNewExercise = async (excersiseDetail) => {
  const newExercise = new ExerciseMaster(excersiseDetail);
  const result = await newExercise.save();
  return result.id;
};
// update on exercise will only take new exercise name and exercise ID
const updateExerciseMaster = async (exerciseId, newData) => {
  const updatedInfo = {
    name: newData.name,
  };
  const query = {
    _id: exerciseId,
  };
  const opts = { runValidators: true };
  const result = await ExerciseMaster.update(query, { $set: updatedInfo }, opts);
  return result.id;
};

const deleteExerciseMaster = async (exerciseId) => {
  const query = {
    _id: exerciseId,
  };
  const result = await ExerciseMaster.deleteOne(query);
  return result;
};

export {
  getAllExerciseMaster,
  insertNewExercise,
  updateExerciseMaster,
  deleteExerciseMaster,
};
