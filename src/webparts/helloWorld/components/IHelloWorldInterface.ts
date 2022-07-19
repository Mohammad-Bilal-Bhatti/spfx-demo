import { ITool } from "../services/lists/tools/ITool";

export interface IHelloWorldProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export interface IHelloWorldState {
  loading: boolean,
  data: ITool[],
  error: Error;
  selected: {
    item: ITool,
    index: number,
  };
}