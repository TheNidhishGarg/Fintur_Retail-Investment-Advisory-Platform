const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
        global: {
            fetch: (...args) => {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 30000);
                return fetch(...args, { signal: controller.signal })
                    .finally(() => clearTimeout(timeout));
            }
        }
    }
);

exports.findOrCreateUser = async ({ googleId, email, name, avatar }) => {
    const { data: existing, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("google_id", googleId)
        .single();

    if (existing) return existing;

    const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{
            google_id: googleId,
            email,
            name,
            avatar,
            auth_provider: "google",
            tier: null,
        }])
        .select()
        .single();

    if (insertError) throw insertError;
    return newUser;
};

exports.getUserById = async (id) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
};

exports.updateUserProfile = async (userId, data) => {
    console.log("Updating userId:", userId, "data:", data);

    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    console.log("Clean data:", cleanData);

    const response = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/users?id=eq.${userId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "apikey": process.env.SUPABASE_KEY,
                "Authorization": `Bearer ${process.env.SUPABASE_KEY}`,
                "Prefer": "return=representation",
                "Accept": "application/json"
            },
            body: JSON.stringify(cleanData)
        }
    );

    const text = await response.text();
    console.log("Raw response:", text);
    console.log("Status:", response.status);

    const result = JSON.parse(text);
    if (!Array.isArray(result) || result.length === 0) {
        throw new Error("User not found or update failed");
    }
    return result[0];
};
