import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ConfigData {
  theme: string;
  mk: string;
}

// interface ConfigContextType {
//   theme: string;
//   mk: string;
// }

interface ConfigContextType {
  config: ConfigData;
  setConfig: Dispatch<SetStateAction<ConfigData>>;
}
export const ConfigContext = createContext<ConfigContextType | undefined>(
  undefined
);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<ConfigData>({
    theme: "",
    mk: "",
  });

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
