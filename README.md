# Vibe - React Native Expo Starter

A modern React Native Expo starter project with NativeWind (Tailwind CSS) and a complete set of shadcn/ui inspired components.

## 🚀 Features

- ⚡️ **Expo SDK** - Latest Expo framework for easy development
- 🎨 **NativeWind** - Tailwind CSS for React Native
- 🧩 **shadcn/ui Components** - Complete set of UI components including:
  - Buttons (multiple variants and sizes)
  - Cards
  - Inputs & Textarea
  - Badges
  - Switches
  - Checkboxes
  - Radio Groups
  - Progress Bars
  - Alerts
  - Avatars
  - Tabs
  - Separators
  - Spinners
- 📱 **Cross-platform** - Works on iOS, Android, and Web
- 🔧 **TypeScript Ready** - Type definitions included
- 🎯 **Package Name** - Configured as `com.codex.vibe`

## 📦 Project Structure

```
vibe/
├── components/
│   └── ui/
│       ├── alert.js
│       ├── avatar.js
│       ├── badge.js
│       ├── button.js
│       ├── card.js
│       ├── checkbox.js
│       ├── input.js
│       ├── progress.js
│       ├── radio-group.js
│       ├── separator.js
│       ├── spinner.js
│       ├── switch.js
│       ├── tabs.js
│       ├── textarea.js
│       └── index.js
├── lib/
│   └── utils.js
├── App.js
├── global.css
├── tailwind.config.js
├── metro.config.js
├── babel.config.js
└── nativewind-env.d.ts
```

## 🛠️ Installation

The project is already set up with all dependencies. If you need to reinstall:

```bash
npm install
```

## 🏃‍♂️ Running the App

### Start the development server
```bash
npm start
```

### Run on Android
```bash
npm run android
```

### Run on iOS (macOS only)
```bash
npm run ios
```

### Run on Web
```bash
npm run web
```

## 🎨 Using Components

All components are exported from `components/ui/index.js`. Import and use them in your app:

```javascript
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from './components/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Text className="text-2xl font-bold">Hello</Text>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎯 Component Examples

### Buttons
```javascript
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Cards
```javascript
<Card>
  <CardHeader>
    <CardTitle><Text>Title</Text></CardTitle>
    <CardDescription><Text>Description</Text></CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Content goes here</Text>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Forms
```javascript
<Input 
  label="Email" 
  placeholder="Enter your email"
  keyboardType="email-address"
/>

<Textarea 
  label="Message" 
  placeholder="Type your message"
/>

<Switch checked={value} onCheckedChange={setValue} />

<Checkbox 
  label="Accept terms" 
  checked={checked} 
  onCheckedChange={setChecked} 
/>
```

## 🎨 Styling with NativeWind

Use Tailwind CSS classes directly in your React Native components:

```javascript
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-slate-900">Hello World</Text>
  <View className="mt-4 rounded-lg border border-slate-200 p-6">
    <Text className="text-sm text-slate-600">This is styled with Tailwind!</Text>
  </View>
</View>
```

## 🔧 Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize your theme:

```javascript
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Add your custom colors
      },
    },
  },
  plugins: [],
}
```

### Adding New Components

1. Create a new component in `components/ui/`
2. Use the `cn()` utility from `lib/utils.js` for conditional classes
3. Export it from `components/ui/index.js`

## 📱 Package Configuration

The app is configured with:
- **iOS Bundle ID**: `com.codex.vibe`
- **Android Package**: `com.codex.vibe`

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 Contributing

Feel free to customize and extend this starter template for your needs!

## 📄 License

MIT

---

Built with ❤️ using React Native, Expo & NativeWind
