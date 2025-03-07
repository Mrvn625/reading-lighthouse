
import Section from "@/components/ui/section";
import ScienceCard from "./ScienceCard";

const TestScience = () => {
  return (
    <Section title="The Science Behind Our Tests">
      <p>
        Our cognitive tests are based on established research in cognitive psychology, neuroscience, and educational assessment. Here's how each test relates to dyslexia:
      </p>
      
      <div className="space-y-6 my-8">
        <ScienceCard
          title="Phonological Awareness"
          description="Dyslexia is primarily characterized by deficits in phonological processing—the ability to identify and manipulate speech sounds. Research consistently shows that phonological awareness is one of the strongest predictors of reading ability."
          research="Based on measures like the Comprehensive Test of Phonological Processing (CTOPP-2) and research by Stanovich, Wagner, and others."
        />
        
        <ScienceCard
          title="Rapid Automatized Naming (RAN)"
          description="The speed at which individuals can name familiar items (letters, numbers, colors) is strongly correlated with reading fluency. The double-deficit hypothesis suggests that deficits in both phonological awareness and rapid naming contribute to the most severe reading difficulties."
          research="Based on the work of Maryanne Wolf, the Rapid Automatized Naming Test, and longitudinal studies of reading development."
        />
        
        <ScienceCard
          title="Working Memory"
          description="Working memory—the ability to hold and manipulate information in mind—plays a crucial role in reading. Readers must keep earlier parts of a text in mind while decoding new words and integrating meaning."
          research="Based on Baddeley's model of working memory and research showing reduced verbal working memory capacity in many individuals with dyslexia."
        />
        
        <ScienceCard
          title="Processing Speed"
          description="Many individuals with dyslexia show slower processing of visual-verbal information. This affects reading fluency and automatic word recognition, requiring more conscious effort for reading tasks."
          research="Based on research using rapid visual processing tasks and studies of neural activation patterns during reading tasks."
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-dyslexai-blue-700 mb-3">Neuroimaging Evidence</h3>
        <p className="mb-4">
          Brain imaging studies have consistently shown differences in neural activation patterns during reading tasks in individuals with dyslexia:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reduced activation in the left temporoparietal region during phonological processing</li>
          <li>Different patterns of connectivity between language areas</li>
          <li>Compensatory activation in other brain regions</li>
        </ul>
        <p className="mt-4">
          Our tests target the cognitive processes associated with these neural networks to provide a comprehensive assessment of reading-related skills.
        </p>
      </div>
    </Section>
  );
};

export default TestScience;
