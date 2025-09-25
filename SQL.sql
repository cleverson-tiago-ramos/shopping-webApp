-- 1. CRIAR BANCO DE DADOS app-vantage
DROP DATABASE IF EXISTS "app-vantage";
CREATE DATABASE "app-vantage"
    ENCODING 'UTF8'
    LC_COLLATE 'pt_BR.UTF-8'
    LC_CTYPE 'pt_BR.UTF-8'
    TEMPLATE template0;



-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--1. CORE DE AUTENTICAÇÃO
-- Tabela principal de usuários

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NULL,
    password_changed_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_suspended BOOLEAN DEFAULT FALSE NOT NULL,
    suspension_reason TEXT NULL,
    suspension_until TIMESTAMP NULL,
    last_login_at TIMESTAMP NULL,
    last_login_ip INET NULL,
    login_attempts SMALLINT DEFAULT 0 NOT NULL,
    locked_until TIMESTAMP NULL,
    timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
    locale VARCHAR(10) DEFAULT 'pt-BR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
    
    
    
--2. SISTEMA DE SEGURANÇA
-- Logs de segurança
CREATE TABLE security_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_severity VARCHAR(10) DEFAULT 'low' CHECK (event_severity IN ('low', 'medium', 'high', 'critical')),
    ip_address INET NULL,
    user_agent TEXT NULL,
    country_code CHAR(2) NULL,
    metadata JSONB NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessões de usuário
CREATE TABLE user_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id VARCHAR(64) NOT NULL UNIQUE,
    device_id VARCHAR(255) NULL,
    device_type VARCHAR(10) DEFAULT 'web' CHECK (device_type IN ('web', 'mobile', 'tablet', 'desktop')),
    device_name VARCHAR(255) NULL,
    ip_address INET NULL,
    user_agent TEXT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    revoked_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Autenticação de dois fatores
CREATE TABLE two_factor_authentications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    secret VARCHAR(32) NOT NULL,
    backup_codes JSONB NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    enabled_at TIMESTAMP NULL,
    last_used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tokens de acesso pessoal
CREATE TABLE personal_access_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    abilities JSONB NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--3. PERFIS E DADOS PESSOAIS
-- Perfis de usuário
CREATE TABLE profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    birth_date DATE NULL,
    phone_number VARCHAR(20) NULL,
    phone_verified_at TIMESTAMP NULL,
    bio TEXT NULL,
    avatar_url VARCHAR(500) NULL,
    cover_url VARCHAR(500) NULL,
    gender VARCHAR(20) NULL CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    company_name VARCHAR(255) NULL,
    job_title VARCHAR(255) NULL,
    website_url VARCHAR(500) NULL,
    social_links JSONB NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Histórico de perfis
CREATE TABLE profile_histories (
    id BIGSERIAL PRIMARY KEY,
    profile_id BIGINT NOT NULL,
    changes JSONB NOT NULL,
    reason VARCHAR(255) NULL,
    created_by BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Endereços
CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    label VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    complement VARCHAR(100) NULL,
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country CHAR(2) DEFAULT 'BR' NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    is_primary BOOLEAN DEFAULT FALSE NOT NULL,
    is_validated BOOLEAN DEFAULT FALSE NOT NULL,
    validated_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--4. LOGIN SOCIAL
CREATE TABLE social_accounts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    provider_name VARCHAR(50) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255) NULL,
    provider_data JSONB NULL,
    access_token TEXT NULL,
    refresh_token TEXT NULL,
    token_expires_at TIMESTAMP NULL,
    is_primary BOOLEAN DEFAULT FALSE NOT NULL,
    last_used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_provider_account UNIQUE (provider_name, provider_id)
);

--5. SISTEMA DE PERMISSÕES
-- Roles
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    level SMALLINT DEFAULT 0 NOT NULL,
    is_system BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Permissões
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL DEFAULT 'general',
    name VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_system BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relação usuário-role
CREATE TABLE role_user (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id)
);

-- Relação role-permissão
CREATE TABLE permission_role (
    permission_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (permission_id, role_id)
);

-- Hierarquia de roles
CREATE TABLE role_hierarchies (
    role_id BIGINT NOT NULL,
    parent_role_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, parent_role_id)
);

-- Permissões diretas de usuário
CREATE TABLE user_permissions (
    user_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    granted BOOLEAN DEFAULT TRUE NOT NULL,
    granted_by BIGINT NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, permission_id)
);
--6. SISTEMA DE NOTIFICAÇÕES
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500) NULL,
    data JSONB NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    read_at TIMESTAMP NULL,
    scheduled_for TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--7. CHAVES ESTRANGEIRAS
-- Security Logs
ALTER TABLE security_logs 
    ADD CONSTRAINT fk_security_logs_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- User Sessions
ALTER TABLE user_sessions 
    ADD CONSTRAINT fk_user_sessions_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Two Factor
ALTER TABLE two_factor_authentications 
    ADD CONSTRAINT fk_two_factor_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Personal Tokens
ALTER TABLE personal_access_tokens 
    ADD CONSTRAINT fk_tokens_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Profiles
ALTER TABLE profiles 
    ADD CONSTRAINT fk_profiles_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Profile Histories
ALTER TABLE profile_histories 
    ADD CONSTRAINT fk_profile_histories_profile 
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE;

ALTER TABLE profile_histories 
    ADD CONSTRAINT fk_profile_histories_creator 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Addresses
ALTER TABLE addresses 
    ADD CONSTRAINT fk_addresses_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Social Accounts
ALTER TABLE social_accounts 
    ADD CONSTRAINT fk_social_accounts_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Role User
ALTER TABLE role_user 
    ADD CONSTRAINT fk_role_user_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE role_user 
    ADD CONSTRAINT fk_role_user_role 
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;

-- Permission Role
ALTER TABLE permission_role 
    ADD CONSTRAINT fk_permission_role_permission 
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE;

ALTER TABLE permission_role 
    ADD CONSTRAINT fk_permission_role_role 
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;

-- Role Hierarchies
ALTER TABLE role_hierarchies 
    ADD CONSTRAINT fk_role_hierarchies_role 
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;

ALTER TABLE role_hierarchies 
    ADD CONSTRAINT fk_role_hierarchies_parent 
    FOREIGN KEY (parent_role_id) REFERENCES roles(id) ON DELETE CASCADE;

-- User Permissions
ALTER TABLE user_permissions 
    ADD CONSTRAINT fk_user_permissions_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_permissions 
    ADD CONSTRAINT fk_user_permissions_permission 
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE;

ALTER TABLE user_permissions 
    ADD CONSTRAINT fk_user_permissions_granted_by 
    FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL;

-- Notifications
ALTER TABLE notifications 
    ADD CONSTRAINT fk_notifications_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    
    
    
--8. ÍNDICES DE PERFORMANCE
-- Users
CREATE INDEX idx_users_email_active ON users(email, is_active);
CREATE INDEX idx_users_last_login ON users(last_login_at);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_uuid ON users(uuid);

-- Security Logs
CREATE INDEX idx_security_logs_user_event ON security_logs(user_id, event_type);
CREATE INDEX idx_security_logs_created ON security_logs(created_at);
CREATE INDEX idx_security_logs_severity ON security_logs(event_severity);

-- Sessions
CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_sessions_revoked ON user_sessions(is_revoked);
CREATE INDEX idx_sessions_token ON user_sessions(session_id);

-- Profiles
CREATE INDEX idx_profiles_user ON profiles(user_id);

-- Addresses
CREATE INDEX idx_addresses_user ON addresses(user_id);
CREATE INDEX idx_addresses_primary ON addresses(user_id, is_primary);
CREATE INDEX idx_addresses_zip ON addresses(zip_code);

-- Social Accounts
CREATE INDEX idx_social_user ON social_accounts(user_id);
CREATE INDEX idx_social_provider ON social_accounts(provider_name, provider_id);

-- Roles & Permissions
CREATE INDEX idx_role_user_user ON role_user(user_id);
CREATE INDEX idx_role_user_role ON role_user(role_id);
CREATE INDEX idx_permission_role_role ON permission_role(role_id);
CREATE INDEX idx_permissions_category ON permissions(category);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read, created_at);
CREATE INDEX idx_notifications_scheduled ON notifications(scheduled_for);

-- Full Text Search
CREATE INDEX idx_users_name_fts ON users USING gin(to_tsvector('portuguese', name));
CREATE INDEX idx_profiles_bio_fts ON profiles USING gin(to_tsvector('portuguese', bio));

--9. DADOS INICIAIS (SEEDS)
-- Inserir roles básicas
INSERT INTO roles (name, display_name, description, level, is_system) VALUES 
('super_admin', 'Super Administrador', 'Acesso completo ao sistema', 100, true),
('admin', 'Administrador', 'Administrador do sistema', 90, true),
('moderator', 'Moderador', 'Modera conteúdo e usuários', 80, true),
('user', 'Usuário', 'Usuário padrão do sistema', 10, true),
('guest', 'Convidado', 'Acesso limitado', 1, true);

-- Permissões básicas
INSERT INTO permissions (category, name, display_name, description, is_system) VALUES 
('users', 'users.create', 'Criar Usuários', 'Permite criar novos usuários', true),
('users', 'users.read', 'Visualizar Usuários', 'Permite visualizar usuários', true),
('users', 'users.update', 'Editar Usuários', 'Permite editar usuários', true),
('users', 'users.delete', 'Excluir Usuários', 'Permite excluir usuários', true),
('content', 'content.create', 'Criar Conteúdo', 'Permite criar conteúdo', true),
('content', 'content.read', 'Visualizar Conteúdo', 'Permite visualizar conteúdo', true),
('content', 'content.update', 'Editar Conteúdo', 'Permite editar conteúdo', true),
('content', 'content.delete', 'Excluir Conteúdo', 'Permite excluir conteúdo', true),
('system', 'settings.manage', 'Gerenciar Configurações', 'Permite alterar configurações do sistema', true);

-- Atribuir permissões ao super_admin
INSERT INTO permission_role (permission_id, role_id)
SELECT p.id, r.id FROM permissions p, roles r 
WHERE r.name = 'super_admin';

-- Criar usuário admin inicial (senha: admin123)
INSERT INTO users (name, email, password, email_verified_at, is_active) VALUES 
('Administrador', 'admin@sistema.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), true);

-- Atribuir role de super_admin ao usuário admin
INSERT INTO role_user (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r 
WHERE u.email = 'admin@sistema.com' AND r.name = 'super_admin';

--10. VIEWS ÚTEIS
-- View para relatório de usuários
CREATE VIEW user_summary AS
SELECT 
    u.id,
    u.uuid,
    u.name,
    u.email,
    u.is_active,
    u.last_login_at,
    r.name as role_name,
    COUNT(DISTINCT sa.id) as social_accounts_count,
    COUNT(DISTINCT n.id) as unread_notifications
FROM users u
LEFT JOIN role_user ru ON u.id = ru.user_id
LEFT JOIN roles r ON ru.role_id = r.id
LEFT JOIN social_accounts sa ON u.id = sa.user_id
LEFT JOIN notifications n ON u.id = n.user_id AND n.is_read = false
GROUP BY u.id, u.uuid, u.name, u.email, u.is_active, u.last_login_at, r.name;

-- View para auditoria de segurança
CREATE VIEW security_dashboard AS
SELECT 
    DATE(created_at) as log_date,
    event_type,
    event_severity,
    COUNT(*) as event_count,
    COUNT(DISTINCT user_id) as affected_users
FROM security_logs
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), event_type, event_severity
ORDER BY log_date DESC, event_count DESC;

-- 11. FUNÇÕES E PROCEDURES
-- Função para verificar permissões
CREATE OR REPLACE FUNCTION check_user_permission(
    p_user_id BIGINT, 
    p_permission_name VARCHAR
) RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN;
BEGIN
    WITH RECURSIVE role_hierarchy AS (
        SELECT role_id, parent_role_id 
        FROM role_hierarchies
        UNION
        SELECT rh.role_id, h.parent_role_id 
        FROM role_hierarchies rh
        JOIN role_hierarchy h ON rh.parent_role_id = h.role_id
    )
    SELECT EXISTS(
        SELECT 1
        FROM users u
        JOIN role_user ru ON u.id = ru.user_id
        LEFT JOIN role_hierarchy rh ON ru.role_id = rh.role_id
        JOIN permission_role pr ON (ru.role_id = pr.role_id OR rh.parent_role_id = pr.role_id)
        JOIN permissions p ON pr.permission_id = p.id
        LEFT JOIN user_permissions up ON (u.id = up.user_id AND p.id = up.permission_id)
        WHERE u.id = p_user_id 
        AND p.name = p_permission_name
        AND (up.granted IS NULL OR up.granted = true)
        AND (up.expires_at IS NULL OR up.expires_at > NOW())
    ) INTO has_permission;
    
    RETURN has_permission;
END;
$$ LANGUAGE plpgsql;

-- Procedure para limpar sessões expiradas
CREATE OR REPLACE PROCEDURE cleanup_expired_sessions()
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM user_sessions 
    WHERE expires_at < NOW() OR is_revoked = true;
    
    COMMIT;
END;
$$;
