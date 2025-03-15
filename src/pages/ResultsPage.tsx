
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, FileText } from "lucide-react";
import DyslexiaReport from "@/components/report/DyslexiaReport";
import EmptyResultsCard from "@/components/results/EmptyResultsCard";
import SummaryTab from "@/components/results/SummaryTab";
import ChartsTab from "@/components/results/ChartsTab";
import { useResultsData } from "@/components/results/useResultsData";

const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "summary";
  const [activeTab, setActiveTab] = useState(initialTab);

  const {
    testResults,
    userData,
    testDates,
    checklistResults,
    handwritingResults,
    calculateAverageScore,
    getRecommendations,
    generateChartData,
    getMostRecentTestDate
  } = useResultsData();

  // Update URL when tab changes
  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  useEffect(() => {
    // If URL param changes externally, update the active tab
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="Assessment Results"
          description="Your personalized dyslexia screening results and recommendations"
          icon={<BarChart className="h-10 w-10" />}
        />
        
        <div className="max-w-4xl mx-auto">
          {Object.keys(testResults).length === 0 && !handwritingResults && !checklistResults ? (
            <EmptyResultsCard />
          ) : (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="summary">
                  <BarChart className="mr-2 h-4 w-4" />
                  Results Summary
                </TabsTrigger>
                <TabsTrigger value="charts">
                  <LineChart className="mr-2 h-4 w-4" />
                  Charts & Analysis
                </TabsTrigger>
                <TabsTrigger value="report">
                  <FileText className="mr-2 h-4 w-4" />
                  Full Report
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <SummaryTab 
                  testResults={testResults}
                  testDates={testDates}
                  handwritingResults={handwritingResults}
                  checklistResults={checklistResults}
                  calculateAverageScore={calculateAverageScore}
                  getRecommendations={getRecommendations}
                  onViewFullReport={() => handleTabChange("report")}
                />
              </TabsContent>
              
              <TabsContent value="charts">
                <ChartsTab generateChartData={generateChartData} />
              </TabsContent>
              
              <TabsContent value="report">
                <DyslexiaReport 
                  userData={{
                    name: userData.name,
                    age: userData.age ? parseInt(userData.age) : undefined,
                    school: userData.school,
                    grade: userData.grade,
                    email: userData.email,
                    testDate: getMostRecentTestDate(),
                    date: new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  }}
                  testResults={{
                    ...testResults,
                    handwriting: handwritingResults?.overallScore
                  }}
                  recommendations={getRecommendations()}
                  handwritingDetails={handwritingResults}
                  checklistDetails={checklistResults}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ResultsPage;
