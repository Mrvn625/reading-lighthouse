
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, UserPlus } from "lucide-react";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    email: "",
    school: "",
    grade: "",
    isLoggedIn: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage if available
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate basic inputs
    if (!userData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive"
      });
      return;
    }
    
    // Update user logged in status
    const updatedUserData = {
      ...userData,
      isLoggedIn: true
    };
    
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved"
    });
    
    // Navigate to cognitive tests
    setTimeout(() => {
      navigate("/cognitive-tests");
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="dyslexai-container">
        <PageHeader
          title="User Profile"
          description="Provide your information for a personalized assessment experience"
          icon={<User className="h-10 w-10" />}
        />
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter your age"
                      value={userData.age}
                      onChange={handleChange}
                      min="5"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="school">School/Institution (Optional)</Label>
                    <Input
                      id="school"
                      name="school"
                      placeholder="Enter your school or institution"
                      value={userData.school}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="grade">Grade/Year (Optional)</Label>
                    <Input
                      id="grade"
                      name="grade"
                      placeholder="Enter your grade or year"
                      value={userData.grade}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full dyslexai-btn-primary">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Save Profile & Continue
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Your information is stored locally on your device and is only used to personalize your assessment report.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfilePage;
