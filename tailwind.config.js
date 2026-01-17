/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			// ============================================
  			// CUSTOM BRAND COLORS
  			// ============================================
  			// To change your app's colors, simply update the hex values below.
  			// All instances of bg-primary, text-primary, etc. will automatically update.
  			// 
  			// Usage examples:
  			//   bg-primary-600    → Main primary background
  			//   text-primary-600  → Primary text color
  			//   bg-primary        → Uses DEFAULT (primary-600)
  			//   border-primary-400 → Lighter primary border
  			//   hover:bg-primary-700 → Darker on hover
  			//
  			// To change colors: Replace the hex values below with your desired colors
  			// ============================================
			brand: {
				primary: {
					50: '#f0fdf4',   // Very light green tint
					100: '#dcfce7',  // Light green
					200: '#bbf7d0',  // Lighter green
					300: '#86efac',  // Light-medium green
					400: '#4ade80',  // Medium-light green
					500: '#22c55e',  // Medium green
					600: '#2b8a4b',  // Base primary color (your chosen green)
					700: '#15803d',  // Darker green
					800: '#166534',  // Dark green
					900: '#14532d',  // Very dark green
					950: '#052e16',  // Darkest green (almost black with green tint)
				},
				secondary: {
					50: '#D9E5FA',   // Very light blue-gray tint
					100: '#d1d7eb',  // Light blue-gray
					200: '#a3afe7',  // Lighter blue
					300: '#7587e3',  // Light-medium blue
					400: '#475fdf',  // Medium-light blue
					500: '#1a37b8',  // Medium blue
					600: '#0e1942',  // Base secondary color (your chosen dark navy)
					700: '#0a1233',  // Darker navy
					800: '#070c24',  // Very dark navy
					900: '#050815',  // Almost black with blue tint
					950: '#030409',  // Darkest (almost pure black)
				},
			},
			// Map primary and secondary to brand colors for easy use
			primary: {
				DEFAULT: '#2b8a4b', // brand.primary.600
				50: '#f0fdf4',
				100: '#dcfce7',
				200: '#bbf7d0',
				300: '#86efac',
				400: '#4ade80',
				500: '#22c55e',
				600: '#2b8a4b',
				700: '#15803d',
				800: '#166534',
				900: '#14532d',
				950: '#052e16',
			},
			secondary: {
				DEFAULT: '#0e1942', // brand.secondary.600
				50: '#e8ebf5',
				100: '#d1d7eb',
				200: '#a3afe7',
				300: '#7587e3',
				400: '#475fdf',
				500: '#1a37b8',
				600: '#0e1942',
				700: '#0a1233',
				800: '#070c24',
				900: '#050815',
				950: '#030409',
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

