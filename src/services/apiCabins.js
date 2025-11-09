import supabase , { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

//1. create a cabin
export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  )

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin , image : imagePath}] )
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  //2. upload image
  const { error : storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image
  )

  // 3. del cabin if image uploading error
  if(storageError){
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin image could not be uploaded and hence the cabin was nho created");
  }
 
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
