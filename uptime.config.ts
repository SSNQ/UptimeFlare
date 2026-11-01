import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: '广君的云端节点状态大屏',
  // Links shown at the header of your status page
  links: [
    { link: 'https://komari.130128.xyz', label: 'Komari 硬件探针' },
    { link: 'https://130128.xyz', label: '主页' },
    { link: 'https://github.com/SSNQ', label: 'GitHub', highlight: true },
  ],
  // 监控分组与展示层级
  group: {
    '🇨🇳 华南入口与中继网关': ['huawei_cloud_relay', 'huawei_cloud_ssh'],
    '🌏 亚太高可用计算节点': ['aliyun_seoul_ssh', 'aliyun_seoul_ai', 'aws_tokyo_ssh'],
    '☁️ 北美云端与存储集群': [
      'gcp_oregon_1',
      'gcp_oregon_2',
      'gcp_oregon_3',
      'cloudcone_la_ssh',
    ],
    '📱 本地与家庭边缘节点': ['meizu_pro6plus_ssh'],
  },
  // 自定义优雅页脚
  customFooter: `
    <div style="text-align: center; font-size: 13px; color: #888; margin-top: 24px; padding-bottom: 24px; line-height: 1.8;">
      <p style="margin: 0; font-weight: 500; letter-spacing: 0.5px;">⚡ <strong>广君云端基础设施感知中心</strong> · 实时全天候健康监控</p>
      <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.85;">
        由 <a href="https://github.com/SSNQ/UptimeFlare" target="_blank" style="color: inherit; text-decoration: underline;">UptimeFlare</a> 全球边缘节点自动拨测 · 
        硬件级机内状态详见 <a href="https://komari.130128.xyz" target="_blank" style="color: inherit; text-decoration: underline;">Komari 探针</a> · 
        <a href="https://130128.xyz" target="_blank" style="color: inherit; text-decoration: underline;">130128.xyz</a>
      </p>
    </div>
  `.trim(),
}

const workerConfig: WorkerConfig = {
  // KV / D1 写入冷却时间（分钟）
  kvWriteCooldownMinutes: 3,
  // 密码保护配置：启用 HTTP Basic 认证，格式 <USERNAME>:<PASSWORD>
  passwordProtection: 'SSNQ:000130',
  // 监控目标列表
  monitors: [
    // 1. 华为云广州服务器
    {
      id: 'huawei_cloud_relay',
      name: '华为云广州 · Device Link 中继',
      method: 'GET',
      target: 'https://relay.130128.xyz/api/device-link/relay/info',
      tooltip: '华为云广州 Flexus L 实例 (Device Link Relay 状态接口)',
      statusPageLink: 'https://relay.130128.xyz',
      expectedCodes: [200],
      timeout: 10000,
    },
    {
      id: 'huawei_cloud_ssh',
      name: '华为云广州 · SSH 维护通道',
      method: 'TCP_PING',
      target: '113.45.223.62:22',
      tooltip: '华为云广州节点 22 端口可用性探测 (113.45.223.62)',
      timeout: 5000,
    },

    // 2. 阿里云首尔服务器
    {
      id: 'aliyun_seoul_ssh',
      name: '阿里云首尔 · SSH 维护通道',
      method: 'TCP_PING',
      target: '8.220.208.64:22',
      tooltip: '阿里云韩国首尔轻量服务器 SSH 通信 (8.220.208.64:22)',
      timeout: 5000,
    },
    {
      id: 'aliyun_seoul_ai',
      name: '阿里云首尔 · sing-box AI 网关',
      method: 'TCP_PING',
      target: '8.220.208.64:13533',
      tooltip: '阿里云首尔 sing-box 核心协议转发端口 (8.220.208.64:13533)',
      timeout: 5000,
    },

    // 3. AWS 日本东京服务器
    {
      id: 'aws_tokyo_ssh',
      name: 'AWS 东京 · SSH 维护通道',
      method: 'TCP_PING',
      target: '35.76.115.176:22',
      tooltip: 'AWS 日本东京 EC2 计算实例 (35.76.115.176:22)',
      timeout: 5000,
    },

    // 4. CloudCone 洛杉矶服务器
    {
      id: 'cloudcone_la_ssh',
      name: 'CloudCone 洛杉矶 · SSH 维护通道',
      method: 'TCP_PING',
      target: '66.154.110.7:22',
      tooltip: 'CloudCone 美国洛杉矶测试节点 (66.154.110.7:22)',
      timeout: 5000,
    },

    // 5. Google Cloud (GCP) 美国三节点
    {
      id: 'gcp_oregon_1',
      name: 'GCP 美西 #1 · 免费节点 SSH',
      method: 'TCP_PING',
      target: '35.212.240.197:22',
      tooltip: 'Google Cloud us-west1-b #1 (gcp.130128.xyz / 35.212.240.197:22)',
      timeout: 5000,
    },
    {
      id: 'gcp_oregon_2',
      name: 'GCP 美西 #2 · Komari 主控 SSH',
      method: 'TCP_PING',
      target: '35.212.239.43:22',
      tooltip: 'Google Cloud us-west1-b #2 (Komari 探针主控宿主 / 35.212.239.43:22)',
      statusPageLink: 'https://komari.130128.xyz',
      timeout: 5000,
    },
    {
      id: 'gcp_oregon_3',
      name: 'GCP 美西 #3 · 冗余备用 SSH',
      method: 'TCP_PING',
      target: '35.212.158.160:22',
      tooltip: 'Google Cloud us-west1-b #3 (35.212.158.160:22)',
      timeout: 5000,
    },

    // 6. 魅族 Pro 6 Plus 本地辅助节点 (IPv6 DDNS 探测)
    {
      id: 'meizu_pro6plus_ssh',
      name: '魅族 Pro 6 Plus · IPv6 本地边缘',
      method: 'TCP_PING',
      target: 'meizu.130128.xyz:8022',
      tooltip: '家庭本地 Linux aarch64 边缘终端 (meizu.130128.xyz:8022)',
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
