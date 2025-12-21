import { useState } from "react";
import { DataNetworkEsp } from "../interfaces/settings";
import { registerNetwork } from "../services/settings";
import { RegisterResult } from "../interfaces/request";

export function useRegisterDataNetwork() {
  const [loading, setLoading] = useState<boolean>(false);
  const registerDataNetwork = async (
    vaultItem: DataNetworkEsp
  ): Promise<RegisterResult> => {
    setLoading(true);
    try {
      const data: DataNetworkEsp = {
        ...vaultItem,
        mqtt_host: "192.168.4.3",
        mqtt_port: 1883,
      };
      await registerNetwork(data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  return { registerDataNetwork, loading };
}
