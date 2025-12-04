import React, { createContext, useState, ReactNode } from 'react';

interface ThemeContextProps {
theme: 'light' | 'dark';
toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface Props {
children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
const [theme, setTheme] = useState<'light' | 'dark'>('light');

const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
</ThemeContext.Provider>
);
};