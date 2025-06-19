import { RegoExample } from '../types/rego';

export const regoExamples: RegoExample[] = [
  {
    id: 'basic-allow',
    title: 'Basic Allow Policy',
    description: 'A simple policy that allows access based on user role',
    category: 'Basic',
    code: `package authz

import rego.v1

# Allow if user is admin
allow if {
    input.user.role == "admin"
}

# Allow if user owns the resource
allow if {
    input.user.id == input.resource.owner_id
}

# Allow read access to public resources
allow if {
    input.action == "read"
    input.resource.public == true
}`
  },
  {
    id: 'rbac-policy',
    title: 'Role-Based Access Control',
    description: 'RBAC policy with role permissions mapping',
    category: 'RBAC',
    code: `package rbac

import rego.v1

# Role permissions mapping
role_permissions := {
    "admin": ["read", "write", "delete"],
    "editor": ["read", "write"],
    "viewer": ["read"]
}

# Allow if user has required permission for their role
allow if {
    user_role := input.user.role
    required_permission := input.action
    required_permission in role_permissions[user_role]
}

# Additional rule: admins can access everything
allow if {
    input.user.role == "admin"
}`
  },
  {
    id: 'kubernetes-admission',
    title: 'Kubernetes Admission Controller',
    description: 'Policy for validating Kubernetes resources',
    category: 'Kubernetes',
    code: `package kubernetes.admission

import rego.v1

# Deny pods with privileged containers
deny contains msg if {
    input.request.kind.kind == "Pod"
    input.request.object.spec.containers[_].securityContext.privileged
    msg := "Privileged containers are not allowed"
}

# Require resource limits
deny contains msg if {
    input.request.kind.kind == "Pod"
    container := input.request.object.spec.containers[_]
    not container.resources.limits
    msg := sprintf("Container '%s' must have resource limits", [container.name])
}

# Require specific labels
required_labels := ["app", "version", "environment"]

deny contains msg if {
    input.request.kind.kind == "Pod"
    missing := required_labels[_]
    not input.request.object.metadata.labels[missing]
    msg := sprintf("Missing required label: %s", [missing])
}`
  },
  {
    id: 'data-filtering',
    title: 'Data Filtering Policy',
    description: 'Filter sensitive data based on user permissions',
    category: 'Data Protection',
    code: `package data.filter

import rego.v1

# Filter sensitive fields based on user clearance
filtered_data := result if {
    user_clearance := input.user.clearance_level
    raw_data := input.data
    
    result := object.filter(raw_data, [key, _]) if {
        field_clearance := field_requirements[key]
        user_clearance >= field_clearance
    }
}

# Field clearance requirements
field_requirements := {
    "name": 1,
    "email": 2,
    "phone": 2,
    "ssn": 4,
    "salary": 3,
    "performance_review": 3
}

# Default allow for public fields
field_requirements[field] := 1 if {
    not field_requirements[field]
}`
  },
  {
    id: 'advanced-conditions',
    title: 'Advanced Conditional Logic',
    description: 'Complex policy with multiple conditions and functions',
    category: 'Advanced',
    code: `package advanced

import rego.v1

# Allow access based on complex business rules
allow if {
    valid_user
    valid_time_window
    valid_location
    not user_suspended
}

# User validation rules
valid_user if {
    input.user.active == true
    input.user.email_verified == true
    count(input.user.roles) > 0
}

# Time-based access control
valid_time_window if {
    now := time.now_ns()
    weekday := time.weekday(now)
    hour := time.hour(now)
    
    # Monday to Friday (1-5)
    weekday >= 1
    weekday <= 5
    
    # Business hours (9 AM to 6 PM)
    hour >= 9
    hour <= 18
}

# Location-based access control
valid_location if {
    allowed_countries := {"US", "CA", "GB", "DE", "FR"}
    input.request.geo.country in allowed_countries
}

# Check if user is suspended
user_suspended if {
    suspension := data.user_suspensions[input.user.id]
    suspension.active == true
    time.now_ns() < suspension.expires_at
}`
  }
];