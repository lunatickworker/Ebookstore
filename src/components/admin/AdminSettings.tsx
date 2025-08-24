import React, { useState } from 'react';
import { Save, Upload, Download, Shield, Bell, Mail, Database, Key } from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Ebookstore',
    siteDescription: '밤늦은 독서를 위한 편안한 디지털 서재',
    allowRegistration: true,
    emailNotifications: true,
    pushNotifications: false,
    autoBackup: true,
    maintenanceMode: false,
    maxFileSize: 50,
    sessionTimeout: 30
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // 설정 저장 로직
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-reading-accent">시스템 설정</h2>
        <button onClick={handleSave} className="btn-primary px-6 py-2 flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>설정 저장</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 일반 설정 */}
        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>일반 설정</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">사이트 이름</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="form-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">사이트 설명</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                rows={3}
                className="form-input w-full resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
                />
                <span className="text-reading-text">회원가입 허용</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
                />
                <span className="text-reading-text">유지보수 모드</span>
              </label>
            </div>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6 flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>알림 설정</span>
          </h3>
          
          <div className="space-y-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
              />
              <div>
                <div className="text-reading-text">이메일 알림</div>
                <div className="text-sm text-reading-muted">새로운 가입, 구매 등의 알림을 이메일로 받습니다</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
              />
              <div>
                <div className="text-reading-text">푸시 알림</div>
                <div className="text-sm text-reading-muted">브라우저 푸시 알림을 활성화합니다</div>
              </div>
            </label>

            <div>
              <label className="block text-sm mb-2">세션 만료 시간 (분)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="1440"
                className="form-input w-full"
              />
            </div>
          </div>
        </div>

        {/* 파일 설정 */}
        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6 flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>파일 설정</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">최대 파일 크기 (MB)</label>
              <input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                min="1"
                max="500"
                className="form-input w-full"
              />
              <p className="text-xs text-reading-muted mt-1">업로드 가능한 최대 파일 크기를 설정합니다</p>
            </div>

            <div className="space-y-3">
              <button className="btn-secondary w-full py-2 flex items-center justify-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>벌크 업로드</span>
              </button>
              <button className="btn-secondary w-full py-2 flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>데이터 내보내기</span>
              </button>
            </div>
          </div>
        </div>

        {/* 백업 설정 */}
        <div className="book-card p-6 paper-texture">
          <h3 className="text-xl text-reading-accent mb-6 flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>백업 설정</span>
          </h3>
          
          <div className="space-y-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                className="w-4 h-4 rounded border-border bg-input text-accent focus:ring-accent focus:ring-2"
              />
              <div>
                <div className="text-reading-text">자동 백업</div>
                <div className="text-sm text-reading-muted">매일 자정에 자동으로 데이터를 백업합니다</div>
              </div>
            </label>

            <div className="space-y-3">
              <button className="btn-primary w-full py-2 flex items-center justify-center space-x-2">
                <Database className="w-4 h-4" />
                <span>지금 백업 실행</span>
              </button>
              <button className="btn-secondary w-full py-2 flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>백업 파일 다운로드</span>
              </button>
            </div>

            <div className="text-sm text-reading-muted">
              <div>마지막 백업: 2024-01-30 00:00:00</div>
              <div>백업 파일 크기: 256 MB</div>
            </div>
          </div>
        </div>
      </div>

      {/* 보안 설정 */}
      <div className="book-card p-6 paper-texture">
        <h3 className="text-xl text-reading-accent mb-6 flex items-center space-x-2">
          <Key className="w-5 h-5" />
          <span>보안 설정</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-reading-accent">API 키 관리</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <div className="text-sm text-reading-text">메인 API 키</div>
                  <div className="text-xs text-reading-muted font-mono">sk-*********************abc</div>
                </div>
                <button className="btn-ghost px-3 py-1 text-xs">재생성</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <div className="text-sm text-reading-text">백업 API 키</div>
                  <div className="text-xs text-reading-muted font-mono">sk-*********************xyz</div>
                </div>
                <button className="btn-ghost px-3 py-1 text-xs">재생성</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-reading-accent">접근 로그</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-reading-muted">관리자 로그인</span>
                <span className="text-reading-text">5분 전</span>
              </div>
              <div className="flex justify-between">
                <span className="text-reading-muted">시스템 백업</span>
                <span className="text-reading-text">2시간 전</span>
              </div>
              <div className="flex justify-between">
                <span className="text-reading-muted">설정 변경</span>
                <span className="text-reading-text">1일 전</span>
              </div>
            </div>
            <button className="btn-secondary w-full py-2 text-sm">전체 로그 보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}