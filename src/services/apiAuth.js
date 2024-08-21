import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.msg);
  }
  return data;
}
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("The username/password is incorrect");
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ fullName, password, avatar }) {
  let updateData = {};
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  //upload the file to the supabase storage
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avators")
    .upload(fileName, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }

  //update the user with the avator url
  updateData = {
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avators/${fileName}`,
    },
  };

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser(updateData);
  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
}
