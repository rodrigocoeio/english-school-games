export default interface GameConfigs {
  name: string;
  path: string;
  port: number;
  repository: string;
  href?: string;  
  installed?: boolean;
  built?: boolean;
  running?: boolean;
}
