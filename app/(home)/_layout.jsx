// Layout das telas autenticadas com navegação por abas (Tab Navigator)
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Maternal: Ícones pro na barra de abas!

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:   '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor:  '#E2E8F0',
          height:          65,
          paddingBottom:   10,
          paddingTop:      8,
        },
        headerStyle:      { backgroundColor: '#2563EB' },
        headerTintColor:  '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Resumo Financeiro',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          headerTitle: 'Meu Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

