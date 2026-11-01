import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "广君的云端节点状态大屏",
  // Links shown at the header of your status page
  links: [
    { link: 'https://130128.xyz', label: '主页' },
    { link: 'https://github.com/SSNQ', label: 'GitHub', highlight: true },
  ],
}

const workerConfig: WorkerConfig = {
  // Define all your monitors here
  monitors: [
    // 1. 华为云广州服务器
    {
      id: 'huawei_cloud_relay',
      name: '华为云广州 · 中继服务',
      method: 'GET',
      target: 'https://relay.130128.xyz/api/device-link/relay/info',
      tooltip: '华为云广州 Flexus L 实例 (Device Link Relay)',
      statusPageLink: 'https://relay.130128.xyz',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'huawei_cloud_ssh',
      name: '华为云广州 · SSH',
      method: 'TCP_PING',
      target: '113.45.223.62:22',
      tooltip: '华为云广州节点 SSH 端口可用性',
      timeout: 5000,
    },

    // 2. 阿里云首尔服务器
    {
      id: 'aliyun_seoul_ssh',
      name: '阿里云首尔 · SSH',
      method: 'TCP_PING',
      target: '8.220.208.64:22',
      tooltip: '阿里云韩国首尔轻量服务器 SSH 通信',
      timeout: 5000,
    },
    {
      id: 'aliyun_seoul_ai',
      name: '阿里云首尔 · AI 网关',
      method: 'TCP_PING',
      target: '8.220.208.64:13533',
      tooltip: '阿里云首尔 sing-box 核心端口',
      timeout: 5000,
    },

    // 3. AWS 日本东京服务器
    {
      id: 'aws_tokyo_ssh',
      name: 'AWS 东京 · SSH',
      method: 'TCP_PING',
      target: '35.76.115.176:22',
      tooltip: 'AWS 日本东京 EC2 节点',
      timeout: 5000,
    },

    // 4. CloudCone 洛杉矶服务器
    {
      id: 'cloudcone_la_ssh',
      name: 'CloudCone 洛杉矶 · SSH',
      method: 'TCP_PING',
      target: '66.154.110.7:22',
      tooltip: 'CloudCone 美国洛杉矶测试节点',
      timeout: 5000,
    },

    // 5. Google Cloud (GCP) 美国三节点
    {
      id: 'gcp_oregon_1',
      name: 'GCP #1 免费节点 · SSH',
      method: 'TCP_PING',
      target: '35.212.240.197:22',
      tooltip: 'GCP us-west1-b 节点 #1 (gcp.130128.xyz)',
      timeout: 5000,
    },
    {
      id: 'gcp_oregon_2',
      name: 'GCP #2 主控节点 · SSH',
      method: 'TCP_PING',
      target: '35.212.239.43:22',
      tooltip: 'GCP us-west1-b 节点 #2 (当前 Komari 主控)',
      timeout: 5000,
    },
    {
      id: 'gcp_oregon_3',
      name: 'GCP #3 备用节点 · SSH',
      method: 'TCP_PING',
      target: '35.212.158.160:22',
      tooltip: 'GCP us-west1-b 节点 #3',
      timeout: 5000,
    },

    // 6. 魅族 Pro 6 Plus 本地辅助节点 (IPv6 DDNS 探测)
    {
      id: 'meizu_pro6plus_ssh',
      name: '魅族 Pro 6 Plus 边缘节点 · SSH',
      method: 'TCP_PING',
      target: 'meizu.130128.xyz:8022',
      tooltip: '家庭本地 Linux aarch64 边缘节点 (IPv6 DDNS: meizu.130128.xyz:8022)',
      timeout: 8000,
    },
  ],
  notification: {
    // 预留通知配置
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 可以在此处扩展推送通知
    },
  },
}

const maintenances: MaintenanceConfig[] = []

// Don't edit this line
export { maintenances, pageConfig, workerConfig }
