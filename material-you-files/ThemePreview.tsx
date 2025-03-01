import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Filter,
  ListFilter,
  Info,
  HelpCircle,
  Settings,
  Sliders,
  Palette,
} from "lucide-react";

const ThemePreview = () => {
  return (
    <Card className="glass-card w-full animate-fade-in delay-200">
      <CardHeader>
        <CardTitle>Theme Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>

          <TabsContent
            value="components"
            className="mt-4 space-y-8 animate-scale-in"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Error</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Text Fields</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Selection Controls</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notification" />
                  <Label htmlFor="notification">Notifications</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Chips & Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Cards</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Card Title</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      This is a card with default styling.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Primary Card</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm opacity-90">
                      This card uses primary colors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary text-secondary-foreground">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Secondary Card</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm opacity-90">
                      This card uses secondary colors.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Action Buttons</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ListFilter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Sliders className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Palette className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="typography"
            className="mt-4 space-y-6 animate-scale-in"
          >
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <p className="text-sm text-muted-foreground">
                  Main page heading, only one per page
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <p className="text-sm text-muted-foreground">
                  Section heading, multiple per page
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <p className="text-sm text-muted-foreground">
                  Subsection heading
                </p>
              </div>

              <div>
                <h4 className="text-xl font-medium">Heading 4</h4>
                <p className="text-sm text-muted-foreground">
                  Component heading
                </p>
              </div>

              <div>
                <h5 className="text-lg font-medium">Heading 5</h5>
                <p className="text-sm text-muted-foreground">
                  Small component heading
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-base">Body (Default)</p>
                <p className="text-base">
                  This is the default body text used throughout the application.
                  It should be comfortable to read and have good contrast with
                  the background.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">Small</p>
                <p className="text-sm">
                  Smaller text used for less important information or in
                  space-constrained areas.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold">Extra Small</p>
                <p className="text-xs">
                  Used for metadata, captions, and other supporting text.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Text Colors</p>
              <div className="space-y-2">
                <p>Default Text</p>
                <p className="text-muted-foreground">Muted Text</p>
                <p className="text-primary">Primary Text</p>
                <p className="text-secondary-foreground bg-secondary p-1 rounded">
                  Secondary Text (on secondary bg)
                </p>
                <p className="text-destructive">Error Text</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ThemePreview;
