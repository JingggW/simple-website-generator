import { demoConfig } from "@/config/demo";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/NavBar";

export default function Home() {
  return (
    <ThemeProvider theme={demoConfig.theme}>
      <Navbar config={demoConfig.header} />
      <main>
        {demoConfig.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </main>
    </ThemeProvider>
  );
}
