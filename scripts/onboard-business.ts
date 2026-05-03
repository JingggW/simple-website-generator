import fs from "fs";
import path from "path";
import { extract_business_profile } from "../engine/generators/profile_generator";

async function main() {
  const args = process.argv.slice(2).reduce(
    (acc, arg) => {
      const [key, value] = arg.split("=");
      acc[key.replace("--", "")] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const { description } = args;

  if (!description) {
    console.error(
      '❌ Usage: npx tsx scripts/onboard-business.ts --description="I run a hair salon in Point Cook..."',
    );
    process.exit(1);
  }

  try {
    const profile = await extract_business_profile(description);

    // Create onboarding directory if not exists
    const onboardingDir = path.join(process.cwd(), "onboarding");
    if (!fs.existsSync(onboardingDir)) {
      fs.mkdirSync(onboardingDir, { recursive: true });
    }

    // Sanitize business name for filename
    const filename = profile.bizName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    
    const filePath = path.join(onboardingDir, `${filename}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(profile, null, 2));

    console.log("\n✨ Business Onboarded Successfully!");
    console.log(`📁 Profile saved to: onboarding/${filename}.json`);
    console.log("\nStructured Data Preview:");
    console.log(JSON.stringify(profile, null, 2));

  } catch (error) {
    console.error("❌ Onboarding failed:", error);
    process.exit(1);
  }
}

main();
